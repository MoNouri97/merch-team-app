import faker from 'faker';

const day = new Date();
let Data: Array<{ day: Date; planning: any[] }> = [];
for (let i = 0; i < 10; i++) {
	const p = [];
	for (let i = 0; i < 3; i++) {
		p.push({
			GMS: faker.company.companyName(),
			state: false,
			time: faker.datatype.number({ min: 5, max: 30 }),
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
		day: day.setDate(i + 1) as any,
		planning: p,
	});
}

export { Data };
