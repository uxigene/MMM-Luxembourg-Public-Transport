# MMM-Luxembourg-Public-Transport
Luxembourg public transport departures in real time. Module for MagicMirror².

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone git@github.com:MarinescuEvghenii/MMM-Luxembourg-Public-Transport.git
````

Configure the module in your `config.js` file.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-Luxembourg-Public-Transport',
		config: {
			// See 'Configuration options' for more information.
		}
	}
]
````

## Configuration options
Please check this [API](https://data.public.lu/en/datasets/arrets-de-transport-public-et-departs-en-temps-reel/).

The following property can be configured:

| Option | Description | Default value |
| -------|-------------|:-------------:|
| from | Station ID. [API parameter](http://travelplanner.mobiliteit.lu/hafas/query.exe/dot?performLocating=2&tpl=stop2csv&look_maxdist=150000&look_x=6112550&look_y=49610700&stationProxy=yes). | - |
| to | Station ID. [API parameter](http://travelplanner.mobiliteit.lu/hafas/query.exe/dot?performLocating=2&tpl=stop2csv&look_maxdist=150000&look_x=6112550&look_y=49610700&stationProxy=yes). | - |
| duration | Interval size in minutes. Range is from 1 to 1439 minutes. [API parameter](http://travelplanner.mobiliteit.lu/hafas/query.exe/dot?performLocating=2&tpl=stop2csv&look_maxdist=150000&look_x=6112550&look_y=49610700&stationProxy=yes). | 720 |
| fetchInterval | Fetch interval in milliseconds. | 6000 |
| maxLength | Maximum items to be displayed in schedule. | 16 |
| animationSpeed | [Animation speed in milliseconds.](https://github.com/MichMich/MagicMirror/blob/master/modules/README.md#thisupdatedomspeed) | 2000 |
