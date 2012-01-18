<tr class="table_row1" id="a-shipbuilder-ship-${id}" sid="${id}">
	<td class="a-button a-shipbuilder-addone"
		title="Click to add just one to build request">${race}</td>
	<td align="left"><a href="i.cfm?f=com_ship2&shiptype=${id}" class="">${name}</a></td>
	<td align="center" class="a-shipbuilder-input"><input type="text"
		style="width: 50px;" /></td>
	<td align="right" class="a-button a-shipbuilder-addturn"
		title="Click to add a turnful to build request">${build}</td>
	<td align="right" class="a-button a-shipbuilder-removeturn"
		title="Click to remove a turnful to build request">${cost}</td>
	<td align="right" class="a-button a-shipbuilder-double"
		title="Click to double build request">${power}</td>
	<td align="right" class="a-button a-shipbuilder-clear a-shipbuilder-stackpower"
		title="Click to clear build request">${stack_power}</td>
	<td align="right" class="a-button a-shipbuilder-order"><input type="text"
		style="width: 50px;" value="${order}"/></td>
</tr>