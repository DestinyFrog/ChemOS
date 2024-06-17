interface RootObject {
	elements: AtomSchema[];
}

interface AtomSchema {
	name: string;
	atomic_radius: null | number;
	appearance: null | string;
	atomic_mass: number;
	boil: null | number;
	category: string;
	density: null | number;
	discovered_by: null | string;
	melt: null | number;
	molar_heat: null | number;
	named_by: null | string;
	number: number;
	period: number;
	group: number;
	phase: string;
	source: string;
	bohr_model_image: null | string;
	bohr_model_3d: null | string;
	spectral_img: null | string;
	summary: string;
	symbol: string;
	xpos: number;
	ypos: number;
	wxpos: number;
	wypos: number;
	shells: number[];
	electron_configuration: string;
	electron_configuration_semantic: string;
	electron_affinity: null | number;
	electronegativity_pauling: null | number;
	ionization_energies: number[];
	'cpk-hex': null | string;
	image: Image;
	block: string;
  }
  
  interface Image {
	title: string;
	url: string;
	attribution: string;
  }