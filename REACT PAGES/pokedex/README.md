
# Pokedex Application

This is a React-based Pokedex application that fetches and displays information about Pokémon. The application allows users to search for Pokémon, view details, and navigate through pages of Pokémon.

## Features

- Fetches and displays Pokémon data from the PokeAPI.
- Search functionality to find specific Pokémon.
- Paginated display of Pokémon.
- Carousel displaying the top 10 Pokémon.
- Detailed modal view for each Pokémon.
- Blurry glass effect and custom scrollbar.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pokedex-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd pokedex-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the search bar to find specific Pokémon by name.
3. Use the pagination buttons to navigate through the pages.
4. Click on a Pokémon card to open a detailed modal view.

## Code Overview

### `Pokedex.js`

This is the main component of the application, which includes:

- State management using React's `useState` and `useEffect` hooks.
- Fetching Pokémon data from the PokeAPI.
- Filtering and paginating the Pokémon data.
- Handling search input and updating the displayed Pokémon.
- Carousel logic for displaying the top 10 Pokémon.
- Modal logic for displaying detailed Pokémon information.

### Custom Scrollbar

The custom scrollbar is defined in the `style` tag within the `Pokedex` component:

```jsx
<style jsx>{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 12px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #1a202c; /* Tailwind's bg-gray-900 */
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #718096; /* Tailwind's bg-gray-600 */
    border-radius: 6px;
    border: 3px solid #1a202c; /* Tailwind's bg-gray-900 */
  }
`}</style>
```

### Blurry Glass Effect

The blurry glass effect is achieved using Tailwind CSS classes:

```jsx
<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg m-10 rounded-lg shadow-lg z-50 overflow-hidden">
```

## Dependencies

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [PokeAPI](https://pokeapi.co/)

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [PokeAPI](https://pokeapi.co/) for providing the Pokémon data.
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
- [Bootstrap Icons](https://icons.getbootstrap.com/) for the icon set.

```
