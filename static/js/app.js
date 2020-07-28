var url = "https://data.cityofchicago.org/resource/j6cj-r444.json";
function getPlot(id) {
d3.json(url, response => {
    console.log(response);
    var filtered_response = response.filter(
        r => r.cause_of_death != "All causes in males" &&
        r.cause_of_death != "All Causes" &&
        r.cause_of_death != "All causes in females" &&
        r.cause_of_death != "Cancer (all sites)" &&
        r.community_area_name != "Chicago"
    );
    console.log(filtered_response);
    var top5 = response.filter(
        r => r.cause_of_death != "All causes in males" &&
        r.cause_of_death != "All Causes" &&
        r.cause_of_death != "All causes in females" &&
        r.cause_of_death != "Cancer (all sites)" &&
        r.community_area_name != "Chicago" &&
        r.cumulative_deaths_rank < 5
    );
    console.log(top5);
    var deaths = _.map(_.groupBy(filtered_response, 'CauseOfDeath'), function (el, key) {
        return {
            key: key,
            values: _.map(el, function (item) {
                return [item.cause_of_death,
                item.cumulative_deaths_2004_2008,
                item.average_annual_deaths_2004_2008,
                item.average_annual_years_of_potential_life_lost_rate_2004_2008,
                item.ypll_rate_rank,
                item.adjusted_rate_rank,
                item.cumulative_deaths_rank];
            })
        };
    });
    console.log(deaths);
    var names = deaths.filter(response => response.key === id)[0];
    console.log(names);
    var cause_of_deaths = names.values.map(response => response[1]);
    console.log(cause_of_deaths);
    var death_cause12 = names.values.map(response => response[0]);
    console.log(death_cause12);
    var communities = names.values.map(response => response[2]);
    console.log(communities);
    var trace = {
        x: cause_of_deaths,
        y: death_cause12,
        type: "bar"
    };
    var data = [trace];
    Plotly.newPlot("bar", data);
    var trace1 = {
    }
    var fgresults = _.groupBy(fresults, s => s.community_area_name);
    console.log(fgresults);
    var com_area_name = fresults.map(response => response.community_area_name);
    console.log(com_area_name);
    var gcan = _.groupBy(com_area_name, s => s.community_area_name);
    console.log(gcan);
    var cu_deaths = fresults.map(results => results.cumulative_deaths_2004_2008);
    console.log(cu_deaths);
});
};

function optionChanged(id) {
    getPlot(id);
}
function init() {
    var dropdown = d3.select("#selDataset");
    d3.json(url, response => {
        var filtered_response = response.filter(
            r => r.cause_of_death != "All causes in males" &&
            r.cause_of_death != "All Causes" &&
            r.cause_of_death != "All causes in females" &&
            r.cause_of_death != "Cancer (all sites)" &&
            r.community_area_name != "Chicago"
        );
        var filtered_response = _.groupBy(fresults, s => s.cause_of_death);
        var new_deaths3 = _.map(_.groupBy(fresults, 'Cause'), function (el, key) {
            return {
                key: key,
                values: _.map(el, function (item) {
                    return [item.cause_of_death, item.cumulative_deaths_2004_2008];
                })
            }
        });
        console.log(new_deaths3);
        var death_names = new_deaths3.map(response => response.key);
        console.log(com_area_name7);
        death_names.forEach(
            name => dropdown
                .append("option")
                .text(name)
                .property("value")
        );
        getPlot(death_names[0]);
    })
};
init();