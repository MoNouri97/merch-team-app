import faker from 'faker';

export const fakeGMSs = new Array(10).fill(null).map((_, i) => ({
	id: i,
	name: faker.company.companyName(),
}));
export const fakeCategories = new Array(10).fill(null).map((_, i) => ({
	id: i,
	name: faker.commerce.department(),
}));
export const fakeProducts = new Array(10).fill(null).map((_, i) => ({
	id: i,
	name: faker.commerce.product(),
}));
export const fakeNotifications = new Array(5).fill(null).map((_, i) => ({
	id: i,
	name: faker.lorem.sentence(4),
	date: faker.date.past(),
}));

const day = new Date();
export const fakePlannings: Array<{ day: Date; planning: any[] }> = [];
for (let i = 0; i < 10; i++) {
	const p = [];
	for (let j = 0; j < 3; j++) {
		p.push({
			GMS: faker.company.companyName(),
			state: false,
			time: faker.datatype.number({ min: 5, max: 30 }),
			status: faker.random.arrayElement([
				'TODO',
				'TODO',
				'NO_REPORT',
				'DONE',
				'DELAYED',
			]),
		});
	}

	fakePlannings.push({
		day: day.setDate(i + 1) as any,
		planning: p,
	});
}
export const fakeChat = new Array(6).fill(null).map((_, i) => ({
	id: i,
	name: faker.random.arrayElement(['me', 'admin', 'supervisor']),
	content: faker.lorem.sentence(3, 5),
	document: faker.datatype.boolean(),
}));
