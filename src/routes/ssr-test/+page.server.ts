import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	return {
		users: generateFakeUsers(10000)
	}
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}
function generateUsername(firstName, lastName) {
	const random = getRandomInt(1, 999);
	const patterns = [
		`${firstName.toLowerCase()}${random}`,
		`${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
		`${firstName.toLowerCase()[0]}${lastName.toLowerCase()}${random}`,
		`${lastName.toLowerCase()}${random}`,
		`${firstName.toLowerCase()}${lastName.toLowerCase()[0]}${random}`
	];
	return getRandomElement(patterns);
}
function generateEmail(firstName, lastName) {
	const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
	const username = generateUsername(firstName, lastName);
	return `${username}@${getRandomElement(domains)}`;
}
function generateRandomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function generateFakeUsers(count: number) {
	const firstNames = ['Ali', 'Ayşe', 'Mehmet', 'Fatma', 'Ahmet', 'Zeynep', 'Mustafa', 'Emine', 'Hasan', 'Hatice', 'Can', 'Elif', 'Murat', 'Selin', 'Emre', 'Deniz', 'Burak', 'Gizem', 'Cem', 'Ceren'];
	const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Öztürk', 'Aydın', 'Özdemir', 'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Koç', 'Kurt', 'Özkan', 'Şimşek', 'Polat', 'Korkmaz'];
	const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Şanlıurfa', 'Kocaeli', 'Mersin', 'Diyarbakır', 'Hatay', 'Manisa', 'Kayseri', 'Samsun', 'Balıkesir', 'Kahramanmaraş', 'Van', 'Aydın'];

	let users:any = [];

	for (let i = 0; i < count; i++) {
		console.log('count: ' + i + '/' + count);
		const firstName = getRandomElement(firstNames);
		const lastName = getRandomElement(lastNames);
		const birthDate = generateRandomDate(new Date(1970, 0, 1), new Date(2000, 0, 1));

		const user = {
			id: i + 1,
			firstName: firstName,
			lastName: lastName,
			username: generateUsername(firstName, lastName),
			email: generateEmail(firstName, lastName),
			birthDate: birthDate.toISOString().split('T')[0],
			age: new Date().getFullYear() - birthDate.getFullYear(),
			address: {
				city: getRandomElement(cities),
				street: `${getRandomElement(['Gül', 'Çiçek', 'Deniz', 'Yıldız', 'Güneş', 'Ay', 'Nehir'])} Sokak`,
				buildingNo: getRandomInt(1, 100),
				zipCode: getRandomInt(10000, 99999)
			},
			phoneNumber: `+90${getRandomInt(500, 559)}${getRandomInt(1000000, 9999999)}`.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3'),
			registrationDate: generateRandomDate(new Date(2015, 0, 1), new Date()).toISOString().split('T')[0],
			isActive: Math.random() > 0.2 // %80 ihtimalle aktif
		};

		users.push(user);
	}

	return users;
}