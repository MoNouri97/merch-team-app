import faker from 'faker';

let Data: Array<{ day: Date; planning: any[] }> = [];
for (let i = 0; i < 10; i++) {
	const p = [];
	for (let i = 0; i < 3; i++) {
		p.push({
			GMS: faker.company.companyName(),
			state: false,
			time: faker.datatype.number({ min: 5, max: 30, precision: 0 }),
			status: faker.random.arrayElement([
				'TODO',
				'TODO',
				'TODO',
				'DONE',
				'DELAYED',
			]),
		});
	}
	Data.push({
		day: faker.date.future(),
		planning: p,
	});
}

export { Data };
