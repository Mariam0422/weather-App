const link = "http://api.weatherapi.com/v1/current.json?key=a42d113e753f4c66a30204211240806";

const store = {
    city: "London"
}
const fetchData = async () => {
 const result = await fetch(`${link}&query=${store.city}`);
 const data = await result.json();
 console.log(data)
}
fetchData();