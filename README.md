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
Please check this <a href="https://data.public.lu/en/datasets/arrets-de-transport-public-et-departs-en-temps-reel/" target="_blank">API</a>

The following property can be configured:

<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>from</code></td>
			<td>
				API parameter. <a href="http://travelplanner.mobiliteit.lu/hafas/query.exe/dot?performLocating=2&tpl=stop2csv&look_maxdist=150000&look_x=6112550&look_y=49610700&stationProxy=yes" target="_blank">Station ID</a>
			</td>
		</tr>

		<tr>
			<td><code>to</code></td>
			<td>
				API parameter. <a href="http://travelplanner.mobiliteit.lu/hafas/query.exe/dot?performLocating=2&tpl=stop2csv&look_maxdist=150000&look_x=6112550&look_y=49610700&stationProxy=yes" target="_blank">Station ID</a>
			</td>
		</tr>

		<tr>
			<td><code>duration</code></td>
			<td>
				API parameter. Interval size in minutes. Range is from 1 to 1439 minutes.
				<b>Default value:</b> <code>720</code>
			</td>
		</tr>

		<tr>
			<td><code>fetchInterval</code></td>
			<td>
				Fetch interval in milliseconds.
				<b>Default value:</b> <code>6000</code>
			</td>
		</tr>

		<tr>
			<td><code>maxLength</code></td>
			<td>
				Maximum items to be displayed in schedule
				<b>Default value:</b> <code>16</code>
			</td>
		</tr>

		<tr>
			<td><code>animationSpeed</code></td>
			<td>
				<a href="https://github.com/MichMich/MagicMirror/blob/master/modules/README.md#thisupdatedomspeed" target="_blank">Animation speed in milliseconds.</a>
				<b>Default value:</b> <code>2000</code>
			</td>
		</tr>

	</tbody>
</table>
