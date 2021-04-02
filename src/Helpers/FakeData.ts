import faker from 'faker';

export const fakeGMSs = new Array(10)
	.fill(null)
	.map(() => faker.company.companyName());
export const fakeCategories = new Array(10)
	.fill(null)
	.map(() => faker.lorem.word(7));
export const fakeProducts = new Array(10)
	.fill(null)
	.map(() => faker.lorem.word(6));

const day = new Date();
export const fakePlannings: Array<{ day: Date; planning: any[] }> = [];
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

	fakePlannings.push({
		day: day.setDate(i + 1) as any,
		planning: p,
	});
}
