let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
let educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

let countyData;
let educationData;

let canvas = d3.select('#canvas');

const drawMap = () => {

};

d3.json(countyURL).then(
    (data) => {
        countyData = data;
        console.log(countyData);
    }
)
.catch((error) => {
    console.error(error.message);
});

