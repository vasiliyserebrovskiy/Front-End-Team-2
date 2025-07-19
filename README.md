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

<Route path="/users" element={<Log in />} /> - +
<Route path="/users" element={<Sign in />} /> - +

# Добавлено для логин:

## 1 pages:

Signin/Signin.tsx
Signup/Signup.tsx

# 2 Внесены изменения в:

## 2.1 components

components/NavBar/NavBar.tsx

добавлена кнопка Logout, убран пункт "Sign up", добавлено отображение email после авторизации

## 2.2 App.tsx

добавлена обертка <AuthProvider></AuthProvider>

# 3 Созданы:

## 3.1 context

context/AuthContext/AuthContext.tsx

## 3.2 providers

provider/AuthProvider.tsx

## 3.3 hooks

hooks/useAuthUsers.tsx

# Использование авторизации:

Если в компоненте нужно что-то, то доступ к пользователю можно получить с использованием хука useAuthUsers();
параметры: { authUser, setAuthUser, setIsAuthorized, isAuthorized }
Так же при логине создается в localSorage переменная "usercode", в которой храниться usercode (который требуется для работы с некоторыми методами нашей API),
а так же переменная "isAuthorized" со значением true.
localStorage.setItem("usercode", usercode);
localStorage.setItem("isAuthorized", "true");

При нажатии на кнопку "Logout" пользователь обнуляется, переменные в localStorage удаляются.
