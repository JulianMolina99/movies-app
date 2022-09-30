const btnMenu = document.getElementById('btn-menu');
const desplegableMenu = document.getElementById('desplegable-menu');
const desplegableMenuGender = document.getElementById('desplegable-menu-gender');
const btnGender = document.getElementById("btn-gender");
const btnGenderBigScreen = document.getElementById('btn-item-gender');
const menuBigScreen = document.getElementById('menu-big-screen');
const movieSection = document.getElementById('container-movies-section');
const xMark = document.getElementById('x-mark');
const input = document.getElementById('input_text');
const home = document.getElementById('btn-home');
const premieres = document.getElementById('btn-premieres');
const btnSearch = document.getElementById('btn-search');
const btnHomeSmallScreen = document.getElementById('home-small-screen');
const btnPremierSmallScreen = document.getElementById('premier-small-screen');


let stateMenuBigScreen = false;
const params = {
    api_key: "3517e148e542447df27e451d513c4742",
    language: 'es',
    include_adult: false,
    page: 1
};

const searchMovie = async (input) => {
    const baseUrl = 'https://api.themoviedb.org/3/search/movie?';
    params.query = input;
    const data = await axios.get(baseUrl, {params});
    printMoviesPage(data.data.results);
};

const getMoviesPrincipalPage = async () =>{
    const baseUrl = 'https://api.themoviedb.org/3/movie/popular?';
    const data = await axios.get(baseUrl,{params});
    menuBigScreen.classList.remove('desplegable-menu-screen-big--show');
    desplegableMenu.classList.remove('deslegable-menu--show');
    printMoviesPage(data.data.results);
}


const getMoviesPremieres = async () =>{
    const baseUrl = 'https://api.themoviedb.org/3/movie/upcoming?';
    const data = await axios.get(baseUrl,{params});
    menuBigScreen.classList.remove('desplegable-menu-screen-big--show');
    desplegableMenu.classList.remove('deslegable-menu--show');
    printMoviesPage(data.data.results);
};

const getMoviesGenders = async (id) =>{
    const baseUrl = 'https://api.themoviedb.org/3/discover/movie?';
    params.with_genres = id;
    const data = await axios.get(baseUrl,{params});
    menuBigScreen.classList.remove('desplegable-menu-screen-big--show');
    desplegableMenu.classList.remove('deslegable-menu--show');
    printMoviesPage(data.data.results);
};

const printMoviesPage = (data) => {
    console.log(data);
    movieSection.innerHTML= '';
    data.map((element)=>{
        const imageUrl = "https://image.tmdb.org/t/p/w1280" + `${element.poster_path}`;
        const title = element.title;
        const voteAverage = element.vote_average;
        const overview = element.overview;
        if(element.poster_path !== null){
            movieSection.innerHTML += `
            <div class="poster-film">
                <div class="poster-film__image">
                    <img src=${imageUrl} alt="poster-movie" class="image-film">
                </div>
                <div class="poster-film__description">
                    <div class="poster-film__title">
                        <h3>${title}</h3>
                    </div>
                    <div class="poster-film-score">
                        <h3>${voteAverage}</h3>
                    </div>
                </div>
                <div class="overview">
                    <h3>Sinopsis:</h3>
                    <p>${overview}</p>
                </div>
            </div>
        `
        }
        
    });
    delete params.with_genres;
};

document.addEventListener('click', (e) => {

    if (e.target.closest('#menu-big-screen') === null && e.target.closest('#btn-item-gender') === null) {
      menuBigScreen.classList.remove('desplegable-menu-screen-big--show');
    }

    if(e.target.closest('#desplegable-menu') === null && e.target.closest('#btn-menu') === null){
        desplegableMenu.classList.remove('deslegable-menu--show');
    }
  });


btnHomeSmallScreen.addEventListener('click', ()=>{
    getMoviesPrincipalPage();
});

btnPremierSmallScreen.addEventListener('click',()=>{
    getMoviesPremieres();
});

btnSearch.addEventListener('click', ()=>{
    searchMovie(input.value);
});

input.addEventListener('input', ()=>{
    console.log(input.value);
    if(input.value === ''){
        xMark.classList.add('x-mark--show');
    } else{
        xMark.classList.remove('x-mark--show');
    }
});

input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && input.value !== ""){
        searchMovie(input.value);
    }
});

xMark.addEventListener('click', ()=>{
    input.value = '';
    xMark.classList.add('x-mark--show');
});

btnMenu.addEventListener('click', ()=>{
    btnMenu.classList.toggle('is-active');
    desplegableMenu.classList.toggle('deslegable-menu--show');
});

home.addEventListener('click', ()=>{
    getMoviesPrincipalPage();
});

btnGender.addEventListener('click', ()=>{
    desplegableMenuGender.classList.toggle('desplegable-menu-gender--show');
});


btnGenderBigScreen.addEventListener('click', (e)=>{
    menuBigScreen.classList.toggle('desplegable-menu-screen-big--show');
});

premieres.addEventListener('click', ()=>{
    getMoviesPremieres();
});

menuBigScreen.addEventListener('click', (e)=>{
    console.log(e.target.id);
    switch(e.target.id){
        case 'action-item':
            getMoviesGenders(28);
        break;
        case 'adventure-item':
            getMoviesGenders(12);
        break;
        case 'animation-item':
            getMoviesGenders(16);
        break;
        case 'comedy-item':
            getMoviesGenders(35);
        break;
        case 'crime-item':
            getMoviesGenders(80);
        break;
        case 'documental-item':
            getMoviesGenders(99);
        break;
        case 'drama-item':
            getMoviesGenders(18);
        break;
        case 'family-item':
            getMoviesGenders(10751);
        break;
        case 'fantasy-item':
            getMoviesGenders(14);
        break;
        case 'history-item':
            getMoviesGenders(36);
        break;
        case 'horror-item':
            getMoviesGenders(27);
        break;
        case 'musical-item':
            getMoviesGenders(10402);
        break;
        case 'mistery-item':
            getMoviesGenders(9648);
        break;
        case 'love-item':
            getMoviesGenders(10749);
        break;
        case 'sciencefiction-item':
            getMoviesGenders(878);
        break;
        case 'thriller-item':
            getMoviesGenders(53);
        break;
        case 'war-item':
            getMoviesGenders(10752);
        break;
        case 'western-item':
            getMoviesGenders(37);
        break;
    }
});

desplegableMenu.addEventListener('click', (e)=>{
    console.log(e.target.id);
    switch(e.target.id){
        case 'action-small-screen':
            getMoviesGenders(28);
        break;
        case 'adventure-small-screen':
            getMoviesGenders(12);
        break;
        case 'animation-small-screen':
            getMoviesGenders(16);
        break;
        case 'comedy-small-screen':
            getMoviesGenders(35);
        break;
        case 'crime-small-screen':
            getMoviesGenders(80);
        break;
        case 'documental-small-screen':
            getMoviesGenders(99);
        break;
        case 'drama-small-screen':
            getMoviesGenders(18);
        break;
        case 'family-small-screen':
            getMoviesGenders(10751);
        break;
        case 'fantasy-small-screen':
            getMoviesGenders(14);
        break;
        case 'history-small-screen':
            getMoviesGenders(36);
        break;
        case 'horror-small-screen':
            getMoviesGenders(27);
        break;
        case 'musical-small-screen':
            getMoviesGenders(10402);
        break;
        case 'mistery-small-screen':
            getMoviesGenders(9648);
        break;
        case 'love-small-screen':
            getMoviesGenders(10749);
        break;
        case 'sciencefiction-small-screen':
            getMoviesGenders(878);
        break;
        case 'thriller-small-screen':
            getMoviesGenders(53);
        break;
        case 'war-small-screen':
            getMoviesGenders(10752);
        break;
        case 'western-small-screen':
            getMoviesGenders(37);
        break;
    }
});


window.onload = getMoviesPrincipalPage();



