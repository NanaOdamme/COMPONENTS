import React, { useState, useEffect } from 'react';

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  
  const limit = 20; // Number of Pokémon per page

  const fetchPokemon = async (page = 1, query = "") => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
      const data = await response.json();

      const filteredResults = data.results.filter(p => p.name.includes(query.toLowerCase()));
      setTotalPages(Math.ceil(filteredResults.length / limit));

      const pokemonData = await Promise.all(
        filteredResults.slice((page - 1) * limit, page * limit).map(async (p) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );

      setPokemon(pokemonData);
    } catch (error) {
      console.error('Error fetching the Pokémon data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getRandomColor = () => {
    const colors = [
      { main: 'bg-rose-400', light: 'bg-rose-300', imbg: 'bg-rose-300' },
      { main: 'bg-sky-400', light: 'bg-sky-300', imbg: 'bg-sky-300' },
      { main: 'bg-green-400', light: 'bg-green-300', imbg: 'bg-green-300' },
      { main: 'bg-yellow-400', light: 'bg-yellow-300', imbg: 'bg-yellow-300' },
      { main: 'bg-teal-400', light: 'bg-teal-300', imbg: 'bg-teal-300' },
      { main: 'bg-pink-400', light: 'bg-pink-300', imbg: 'bg-pink-300' },
      { main: 'bg-indigo-400', light: 'bg-indigo-300', imbg: 'bg-indigo-300' },
      { main: 'bg-purple-400', light: 'bg-purple-300', imbg: 'bg-purple-300' },
      { main: 'bg-blue-400', light: 'bg-blue-300', imbg: 'bg-blue-300' },
      { main: 'bg-red-400', light: 'bg-red-300', imbg: 'bg-red-300' },
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  if (loading) {
    return <div className='h-screen flex justify-center align-center'> <div className="text-white text-center text-2xl">Loading...</div></div>;
  }


  return (
    <>
      <section className='lg:fixed hero z-50'>
        <div className=" bg-gradient-to-b from-zinc-950 via-purple-800 to-purple-950 shadow-lg hero-bg h-96 w-full lg:w-96">
          <div className="">
            {pokemon.slice(0, 10).map((p, index) => {
              
              return (
                <div
                  key={p.id}
                  className={`carousel-item ${carouselIndex === index ? 'block' : 'hidden'}  p-4  mb-4`}
                >
                    <div className="flex lg:justify-between">
                        <div className="w-full mx-auto lg:mx-10 mt-16">
                  <h2 className="text-2xl font-bold text-white capitalize">{p.name}</h2>
                  <p className="text-white mt-2">{p.types.map(type => type.type.name).join(', ')}</p>
                  <p className="text-white mt-2">{p.abilities.map(ability => ability.ability.name).join(', ')}</p>
                  <p className="text-white mt-2">{p.base_experience} XP</p>
                  <button onClick={() => openModal(p)} className="w-full text-center  mt-4 px-4 py-2 bg-black text-white rounded-lg ">
                    <i className="text-white bi bi-eye mr-2"></i>
                    See More
                  </button>
                  </div>
                    <img
                        src={p.sprites.front_default}
                        alt={p.name}
                        className=" w-80 objext-fit" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="p-5">
        <h1 className="text-white text-5xl font-bold text-center mb-8 text-stroke">Pokedex</h1>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemon.map((p) => {
            const { main: cardColor, light: abilityColor, imbg: background } = getRandomColor();
            return (
              <div
                key={p.id}
                className={`cursor-pointer p-2 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ${cardColor}`}
                onClick={() => openModal(p)}
              >
                <div className="flex justify-between">
                  <div className="p-4">
                    <h2 className="lg:text-2xl mg:text-2xl font-bold mb-2 capitalize text-center text-white">{p.name}</h2>
                    <ul className="list-disc list-inside text-center">
                      {p.abilities.map((ability) => (
                        <li
                          key={ability.ability.name}
                          className={`text-xs m-1 block p-1 rounded-full ${abilityColor}`}
                          >
                            {ability.ability.name}
                          </li>
                        ))}
                        
                      </ul>
                    
                    </div>
                    <div className={`absolute bottom-0 lg:-mr-10 md:-mr-10 -mr-20 -mb-16 md:-mb-12 lg:-mb-12 right-0 rounded-full w-32 h-32 ${background}`}> </div>
                    <img
                      src={p.sprites.front_default}
                      alt={p.name}
                      className="absolute bottom-0 right-0 -mr-3 w-20 lg:w-32 md:w-32 object-fit"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-white flex justify-between items-center mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Previous
            </button>
            <span className="text-xl font-bold">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        {selectedPokemon && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg m-10  rounded-lg shadow-lg z-50 overflow-hidden">
    <div className="mt-10 text-white p-6 rounded-lg overflow-auto  custom-scrollbar">
      <button
        className="absolute top-0 right-0 m-4 text-white"
        onClick={closeModal}
      >
        <i className="bi bi-x-lg"></i>
      </button>
      <h2 className="text-3xl font-bold mb-4 capitalize">{selectedPokemon.name}</h2>
      <div className="flex justify-center flex-col gap-8 lg:flex-row">
        <img
          src={selectedPokemon.sprites.front_default}
          alt={selectedPokemon.name}
          className="lg:w-96 shadow-lg w-full mb-4 border-2 border-pink-500 rounded-lg"
        />
        <div className='w-96 mt-20'>
          <p className="mb-2"><strong>Types:</strong> {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
          <p className="mb-2"><strong>Abilities:</strong> {selectedPokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
          <p className="mb-2"><strong>Base Experience:</strong> {selectedPokemon.base_experience}</p>
          <p className="mb-2"><strong>Height:</strong> {selectedPokemon.height / 10} m</p>
          <p className="mb-2"><strong>Weight:</strong> {selectedPokemon.weight / 10} kg</p>
          <p className="mb-2"><strong>Stats:</strong></p>
          <ul className="list-disc list-inside">
            {selectedPokemon.stats.map(stat => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
)}


      </>
    );
  };
  
  export default Pokedex;

