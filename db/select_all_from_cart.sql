select * from cart 
join products on products.productsid = cart.productsid
where usersid = $1
order by cartid;