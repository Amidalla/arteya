import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/home.scss";
import "../styles/modals.scss";
import LazyLoad from "vanilla-lazyload";
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation, Autoplay, Thumbs, EffectFade } from 'swiper/modules';
import IMask from 'imask';
import { SlidersInit } from './sliders.js';

Swiper.use([Pagination, Navigation, Autoplay, Thumbs, EffectFade]);

document.addEventListener('DOMContentLoaded', function() {
    const lazyLoadInstance = new LazyLoad();
    SlidersInit();
});