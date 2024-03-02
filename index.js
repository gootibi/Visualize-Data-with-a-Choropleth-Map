let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
let educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

let countyData;
let educationData;

/** Select the canvas area */
const canvas = d3.select('#canvas');

/** Select the tooltip area */
const tooltip = d3.select('#tooltip');

/** Draw map functions */
const drawMap = () => {

    /** countyData (geojson) draw map */
    canvas.selectAll('path')
        .data(countyData)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')

        /** Map color settings */
        .attr('fill', (countyDataItem) => {

            /** Find countyData items id element (number) equal educationData items fips element (number) */
            let id = countyDataItem['id'];

            let county = educationData.find((item) => {
                return item['fips'] === id
            });

            let percentage = county['bachelorsOrHigher'];

            if (percentage <= 15) {
                return 'tomato'
            } else if (percentage <= 30) {
                return 'orange'
            } else if (percentage <= 45) {
                return 'lightgreen'
            } else {
                return 'limegreen'
            }
        })
        .attr('data-fips', (countyDataItem) => {
            return countyDataItem['id'];
        })
        .attr('data-education', (countyDataItem) => {
            let id = countyDataItem['id'];

            let county = educationData.find((item) => {
                return item['fips'] === id
            });

            let percentage = county['bachelorsOrHigher'];

            return percentage;
        })

        /** Tooltip and mosuse event */
        .on('mouseover', (e, countyDataItem) => {

            /** Tooltip change style */
            tooltip.transition()
                .style('visibility', 'visible');

            /** Tooltip set text */
            let id = countyDataItem['id'];

            let county = educationData.find((item) => {
                return item['fips'] === id
            });
        
            tooltip.text(`${county['area_name']} - ${county['state']}: ${county['bachelorsOrHigher']}%`)

            /** Set the 'data-education' property */
            tooltip.attr('data-education', county['bachelorsOrHigher'])
        })
        .on('mouseout', () => {

            /** Tooltip change style */
            tooltip.transition()
                .style('visibility', 'hidden');
        })

};

/** Datas fetching => countyData and educationData */
d3.json(countyURL).then(
    (data) => {

        /** Convert topo json to geo json */
        countyData = topojson.feature(data, data.objects.counties).features;

        d3.json(educationURL).then(
            (data) => {
                educationData = data;
                drawMap();
            }
        ).catch((err) => {
            console.error(err.message);
        });
    }
).catch((err) => {
    console.error(err.message);
});