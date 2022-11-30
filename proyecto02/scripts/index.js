function main() {
    requestPokemons().then((pokemons) => {
        generateTypesChart(pokemons)
        stopLoading()
        showSecondSection()
        fillOptions(pokemons)
    })

}

const numberOfPokemons = 151
const pokemonsURL = "https://pokeapi.co/api/v2/pokemon/{id}"
const getPokemonURL = (id) => pokemonsURL.replace("{id}", id)

function stopLoading() {
    document.getElementById("loading").setAttribute("class", "d-none")
}

async function requestPokemons() {
    const pokemons = []
    for (let i = 0; i < numberOfPokemons; i++) {
        const url = getPokemonURL(i + 1)
        const res = await fetch(url)
        const pokemon = await res.json()
        pokemons.push(pokemon)
    }
    return pokemons

}

function generateTypesChart(pokemons) {

    const typesCount = {}

    pokemons.forEach(pokemon => {
        pokemon.types.forEach(pokemonType => {
            const typeAdded = !!typesCount[pokemonType.type.name]
            if (!typeAdded) typesCount[pokemonType.type.name] = 1
            else typesCount[pokemonType.type.name] += 1
        })
    })

    const columns = Object.entries(typesCount).map(([type, count]) => ({ type, count }))
    const chart = columnChart(columns)

    const typesChartSection = document.getElementById("pokemon-types")
    typesChartSection.appendChild(chart)

}

function columnChart(columns) {

    const totalPokemons = columns.reduce((total, { count }) => total + count, 0)
    const percentagesColumns = columns.map(({ type, count }) => ({ type, percentage: count / totalPokemons }))

    const table = document.createElement("table")
    table.setAttribute("class", "animate__animated animate__bounce charts-css column show-heading show-labels show-data-axes")

    const caption = document.createElement("caption")
    caption.innerHTML = "Pokemon types chart"

    const tbody = document.createElement("tbody")

    percentagesColumns.forEach(column => {
        const tr = document.createElement("tr")
        const th = document.createElement("th")
        th.setAttribute("scope", "row")
        th.innerHTML = column.type
        const td = document.createElement("td")
        const style = `--size: ${column.percentage.toFixed(2)};`
        td.setAttribute("style", style)
        tr.appendChild(th)
        tr.appendChild(td)
        tbody.appendChild(tr)
    })

    table.appendChild(caption)
    table.appendChild(tbody)

    return table
}

function generateSecondaryTypesChart(pokemons, primaryType) {
    if (primaryType === "none") return
    const secondaryTypesChartSection = document.getElementById("pokemon-secondary-types")
    secondaryTypesChartSection.innerHTML = ""

    const secondaryTypesCount = {}
    pokemons.forEach(pokemon => {
        const hasSelectedPrimaryType = pokemon.types.some(pokemonType => pokemonType.type.name === primaryType)
        const hasSecondaryType = pokemon.types.length > 1
        if (hasSelectedPrimaryType && hasSecondaryType) {
            const secondaryType = pokemon.types.find(pokemonType => pokemonType.type.name !== primaryType)
            const typeAdded = !!secondaryTypesCount[secondaryType.type.name]
            if (!typeAdded) secondaryTypesCount[secondaryType.type.name] = 1
            else secondaryTypesCount[secondaryType.type.name] += 1
        }
    })

    const columns = Object.entries(secondaryTypesCount).map(([type, count]) => ({ type, count }))
    const chart = barChart(columns)
    secondaryTypesChartSection.appendChild(chart)


}

function showSecondSection() {
    const section = document.getElementById("select-type")
    section.setAttribute("class", section.className.replace("d-none", ""))
}

function fillOptions(pokemons) {

    const select = document.getElementById("secondary-type")

    const primaryTypes = []
    pokemons.forEach(pokemon => {
        pokemon.types.forEach(pokemonType => {
            if (!primaryTypes.includes(pokemonType.type.name)) primaryTypes.push(pokemonType.type.name)
        })
    })

    const defaultOption = document.createElement("option")
    defaultOption.value = "none"
    defaultOption.innerHTML = "SELECT"
    select.appendChild(defaultOption)

    primaryTypes.forEach(type => {
        const option = document.createElement("option")
        option.value = type
        option.innerHTML = type
        select.appendChild(option)
    })

    select.addEventListener("change", (event) => {
        generateSecondaryTypesChart(pokemons, event.target.value)
    })
}

function barChart(columns) {
    const totalPokemons = columns.reduce((total, { count }) => total + count, 0)
    const percentagesColumns = columns.map(({ type, count }) => ({ type, percentage: count / totalPokemons }))

    const table = document.createElement("table")
    table.setAttribute("class", "animate__animated animate__bounce charts-css bar show-heading show-labels show-data-axes")

    const caption = document.createElement("caption")
    caption.innerHTML = "Secondary types chart"

    const tbody = document.createElement("tbody")

    percentagesColumns.forEach(column => {
        const tr = document.createElement("tr")
        const th = document.createElement("th")
        th.setAttribute("scope", "row")
        th.innerHTML = column.type
        const td = document.createElement("td")
        const style = `--size: ${column.percentage.toFixed(2)};`
        td.setAttribute("style", style)
        tr.appendChild(th)
        tr.appendChild(td)
        tbody.appendChild(tr)
    })

    table.appendChild(caption)
    table.appendChild(tbody)

    return table
}



main()