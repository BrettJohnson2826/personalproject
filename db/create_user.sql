insert into users ( user_name, auth_id )
values( $1, $2 )
returning *;