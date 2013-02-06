module.exports = {
  members: [
    {
      name: "David",
      age: 62,
      occupation: "Retired",
      residence: "Devon"
    },
    {
      name: "Susan",
      age: 59,
      occupation: "Retired",
      residence: "Devon"
    },
    {
      name: "Matt",
      age: 25,
      occupation: "Web Developer",
      residence: "London"
    },
    {
      name: "Laura",
      age: 28,
      occupation: "Doctor",
      residence: "Bristol"
    }
  ],
  url: function() {
    return '/about/family/' + this.name.toLowerCase() + '.html';
  }
};