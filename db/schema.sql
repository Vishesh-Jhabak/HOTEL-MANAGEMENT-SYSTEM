-- Core tables (minimal demo)
-- auth-service would own users/roles in its DB; example here for reference only
create table if not exists users (
  id bigserial primary key,
  username varchar(100) unique not null,
  password varchar(255) not null,
  role varchar(50) not null
);

-- room-service
create table if not exists rooms (
  id bigserial primary key,
  number varchar(20) unique not null,
  status varchar(30) not null,
  type varchar(50) not null,
  base_price numeric
);

-- booking-service
create table if not exists bookings (
  id bigserial primary key,
  customer_id bigint not null,
  room_id bigint not null,
  check_in_date date not null,
  check_out_date date not null,
  status varchar(30) not null
);


