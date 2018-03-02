select sum(cart.quantity * products.product_price) as total_price 
from cart , products
where productsid = products.productsid and usersid = $1;