const Home = r => require.ensure([], () => r(require('pages/App')), 'Home')
const Newslist = r => require.ensure([], () => r(require('pages/Newslist')), 'Newslist')
const Newsdetail = r => require.ensure([], () => r(require('pages/Newsdetail')), 'Newsdetail')
const Recruitment = r => require.ensure([], () => r(require('pages/Recruitment')), 'Recruitment')
const Products = r => require.ensure([], () => r(require('pages/Products')), 'Products')
const ProductDetail = r => require.ensure([], () => r(require('pages/ProductDetail')), 'ProductDetail')
const ShoppingMall = r => require.ensure([], () => r(require('pages/ShoppingMall')), 'ShoppingMall')
const Readings = r => require.ensure([], () => r(require('pages/Readings')), 'Readings')
const Regist = r => require.ensure([], () => r(require('pages/Regist')), 'Regist')
const ServiceTel = r => require.ensure([], () => r(require('pages/ServiceTel')), 'ServiceTel')
const Xvideo = r => require.ensure([], () => r(require('pages/Xvideo')), 'Xvideo')
const Introduction = r => require.ensure([], () => r(require('pages/Introduction')), 'Introduction')
const Laws = r => require.ensure([], () => r(require('pages/Laws')), 'Laws')

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/pages/introduction',
    name: 'introduction',
    component: Introduction
  },
  {
    path: '/pages/newslist',
    name: 'newslist',
    component: Newslist
  },
  {
    path: '/pages/newsdetail',
    name: 'newsdetail',
    component: Newsdetail
  },
  {
    path: '/pages/recruitment',
    name: 'recruitment',
    component: Recruitment
  },
  {
    path: '/pages/products',
    name: 'products',
    component: Products
  },
  {
    path: '/pages/productdetail',
    name: 'productdetail',
    component: ProductDetail
  },
  {
    path: '/pages/shoppingmall',
    name: 'shoppingmall',
    component: ShoppingMall
  },
  {
    path: '/pages/readings',
    name: 'readings',
    component: Readings
  },
  {
    path: '/pages/regist',
    name: 'regist',
    component: Regist
  },
  {
    path: '/pages/servicetel',
    name: 'servicetel',
    component: ServiceTel
  },
  {
    path: '/pages/video',
    name: 'video',
    component: Xvideo
  },
  {
    path: '/pages/laws',
    name: 'laws',
    component: Laws
  }
]
