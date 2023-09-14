const Books = [

	{
		ISBN: "RDPD2345",
		title: "Rich Dad and poor Dad",
		pubDate: "2023-09-06",
		Language: "en",
		numpage: 250,
		Author: [1, 2, 3], 
		publications: [1],
		Category: ["Tech", "Space", "education"]
	},

	{
		ISBN: "Oggy",
		title: "Alche",
		pubDate: "2022-10-16",
		Language: "en",
		numpage: 400,
		Author: [1, 2, 3],
		publications: [1],
		Category: ["Tech", "Space", "education","fiction"]
	}
]

const author = [
	{
		id: 1,
		name: "RobertT",
		Books: ["RDPD2345", "Ikigia"]
	},

	{
		id: 2, 
		name: "Miralles",
		Books: ["RDPD2345"]
	},

	{
		id: 3, 
		name: "Henry_Jr",
		Books: ["Thunder567"]
	}
];


const Publications = [
	{
		ID: 1,
		name: "writex",
		Books: ["1234RDPD","Atomic_Habits"]
	},

	{
		ID: 2,
		name: "Elon Musk",
		Books: []
	}
]

module.exports = { Books, author, Publications};