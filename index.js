const listdivs = document.getElementsByClassName('list')[0];
const http_req_contries = new XMLHttpRequest();
const ctx = document.getElementById('chart').getContext('2d');
http_req_contries.open('GET', 'https://api.covid19api.com/countries');
http_req_contries.onreadystatechange = () => {
    if (http_req_contries.readyState === 4 && http_req_contries.status == 200) {
        // console.log(JSON.parse(http_req_contries.response));
        let countries = JSON.parse(http_req_contries.response);
        countries.forEach(country => {
            let div = document.createElement('div');
            div.classList.add("listitm");
            div.textContent = country.Country;
            div.onclick = () => {
                data_callBack(div.textContent);
            };
            listdivs.appendChild(div);
        });
    }
};
http_req_contries.send();
const http_req_data = new XMLHttpRequest();

function data_callBack(country) {
    console.log(country);
    http_req_data.open('GET', 'https://api.covid19api.com/dayone/country/' + country);
    http_req_data.send();
}
http_req_data.onreadystatechange = () => {
    if (http_req_data.readyState === 4 && http_req_data.status == 200) {
        console.log(JSON.parse(http_req_data.response));
        let data_Death = [];
        let data_Recoverd = [];
        let data_Confirmed = [];
        let data_Active = [];
        let days = [];
        let data = JSON.parse(http_req_data.response);
        data.forEach(day => {
            data_Death.push(day.Deaths);
            data_Recoverd.push(day.Recovered);
            data_Confirmed.push(day.Confirmed);
            data_Active.push(day.Active);
            days.push(day.Date);
        });

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Deaths',
                    data: data_Death,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    borderWidth: 1,
                    borderWidth: 3,
                    pointBorderColor: 'transparent'

                }, {
                    label: 'Recovered',
                    backgroundColor: 'transparent',
                    data: data_Recoverd,
                    borderColor: 'green',
                    borderWidth: 3,
                    pointBorderColor: 'transparent'

                }, {
                    backgroundColor: 'transparent',

                    label: 'Confirmed',
                    data: data_Confirmed,
                    borderColor: 'blue',
                    borderWidth: 1,
                    borderWidth: 3,
                    pointBorderColor: 'transparent'

                }, {
                    backgroundColor: 'transparent',

                    label: 'Active',
                    data: data_Active,
                    borderColor: 'yellow',
                    borderWidth: 1,
                    borderWidth: 3,
                    pointBorderColor: 'transparent'

                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }
};