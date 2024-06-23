export interface atom_schema {
	name: string;
	atomic_radius: null | number;
	eletronegativity: null | number;
	atomic_mass: number;
	category: string;
	number: number;
	period: number;
	group: number;
	symbol: string;
	phase: string;
	xpos: number;
	ypos: number;
	shells: number[];
	electron_configuration: string;
}

enum ligation_type {
	'ionic',
	'covalent'
}
