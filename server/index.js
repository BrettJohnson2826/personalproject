require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const bodyParser = require('body-parser')
const massive = require('massive')

const { joesPennyFunction } = require('./converter')


const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    STRIPE_PRIVATE_KEY,
    REACT_APP_LOGIN,
    HOME,
    HASH_HOME
} = process.env

const app = module.exports = express()
app.use( express.static( `${__dirname}/../build` ) );
app.use(bodyParser.json())

app.use( session( {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
} ) )

app.use( passport.initialize( ) )
app.use( passport.session( ) )

massive( CONNECTION_STRING ).then( db => {
    app.set( 'db', db )
} )

passport.use( new Auth0Strategy( {
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function( accessToken, refreshToken, extraParams, profile, done ) {
    const db = app.get( 'db' )
    const { sub, name} = profile._json;
    console.log("PROFILE", profile)
    db.find_user( [ sub ] ).then( response => {
        if ( response[ 0 ] ) {
            console.log("USER FOUND", response[0])
            done( null, response[ 0 ].usersid)
        } else {
            db.create_user( [name, sub ] ).then( response => {
                console.log("USER CREATED", response[0])
                done( null, response[ 0 ].usersid)
            } )
        }
    } )
} ) );

passport.serializeUser( ( id, done ) => {
    console.log("SERIALIZE ID", id)
    done( null, id)
} );
passport.deserializeUser( ( id, done ) => { 
    console.log("DESERIALIZE ID", id)
    const db = app.get( 'db' )
    db.find_logged_in_user( [ id ] ).then( res => {
        done( null, res[ 0 ] )
    } )
} );

app.use((req, res, next) => { console.log(req.method, req.url); next() })

app.get( '/auth', passport.authenticate( 'auth0' ) );
app.get( '/callback', passport.authenticate( 'auth0', {
    successRedirect:  HASH_HOME ,
    failureRedirect:  REACT_APP_LOGIN 
} ) );

app.get( '/auth/me', ( req, res ) => {
    if ( !req.user ) {
        res.status( 404 ).send( 'Not logged in.' )
    } else {
        res.status( 200 ).send( req.user )
    }
} );

app.get('/logout', ( req, res ) => {
    req.logOut();
    res.redirect( HASH_HOME )
} );

app.get('/api/longboards', function( req, res ) {
    console.log("GET BOARDS USER", req.user)
    app.get('db').select_all_longboards().then( response => {
        res.status(200).send(response) } )
    
} )
app.post('/api/addToCart', ( req, res ) => {
    let { productsID } = req.body
    console.log('req.user', req.body)
    let usersID = req.user.usersid
    app.get('db').add_to_cart([usersID, productsID]).then( response => {
        res.status(200).send('Item added to cart')
    } )

    console.log(req.body.productsid)
    console.log(req.user.usersid)
} )
app.get('/api/cart', function( req, res ) {
    let userID = req.user.usersid
    app.get('db').select_all_from_cart([userID]).then(response => {
        console.log(response)
        res.status(200).send(response)
    })
} ) 
app.get('/api/totalprice', function( req, res ) {
    app.get('db').totalprice().then( response => {
        res.status(200).send(response)
    })
})
app.delete('/api/removefromcart/:products', function( req, res ) {
    console.log('test', req.params)
    app.get('db').delete_from_cart([req.params.products]).then(response => {
        res.status(200).send(response)
    })
} )
app.put('/api/updatequantity/:products/:cartid', function ( req, res ) {
    console.log(req.params.products)
    console.log(req.params.cartid)
    app.get('db').update_quant([+req.params.products, +req.params.cartid]).then(response => {
        res.status(200).send(response)
    })
} )
app.get('/logout', ( req, res ) => {
    req.logout(
        res.redirect( HOME )
    )
} )
app.post('./api/payment', (req, res, next) => {
    const amountArray = req.body.amount.toString().split('')
    const convertedAmt = joesPennyFunction(amountArray)
    const charge = stripe.charges.create(
        {
            amount: convertedAmt,
            currency: 'usd',
            source: req.body.token.id,
            description: 'Stripe Checkout test charge'
        },
        function(err, charge) {
            if(err) return res.sendStatus(500);
            else return res.status(200).send(charge)
        }
    )
    
})




app.listen( SERVER_PORT, () =>
console.log( `Listening on port ${ SERVER_PORT }`) );