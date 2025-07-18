<Route path="/" element={<MainLayout />}>
<Route index element={<Home />} /> - главная [простой вариант - 12 случайных блюд] + (404 Ошибка)
'https://fakerestaurantapi.runasp.net/api/Restaurant/items' - случайные 12 блюд
<Route path="/about" element={<About />} /> - список магазинов 1,2,3....
fetch('https://fakerestaurantapi.runasp.net/api/Restaurant')

<Route path="/categories" element={<Categories />} /> - список типов у магазинов, имя типа и какой-то одно фото на бекграуде под ним
fetch('https://fakerestaurantapi.runasp.net/api/Restaurant')
<Route path="/products" element={<Products />} /> - фотка, название, цена, добавить в корзину
fetch('https://fakerestaurantapi.runasp.net/api/Restaurant/items')

<Route path="/carts" element={<Carts />} /> - список добавленией и снизу одна кнопа Заказать
fetch('https://fakerestaurantapi.runasp.net/api/Order/{resaurant id}/makeorder?apikey={api key}'{
<Route path="/users" element={<Users />} />
fetch('https://fakerestaurantapi.runasp.net/api/User')
<Route path="/users" element={<Log in />} />
<Route path="/users" element={<Sign in />} />
