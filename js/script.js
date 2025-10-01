function filterVPN() {
    const minPrice = parseFloat(document.getElementById("min-price").value);
    const maxPrice = parseFloat(document.getElementById("max-price").value);
    const table = document.getElementById("vpn-table").getElementsByTagName("tbody")[0];

    for (let row of table.rows) {
        let price = parseFloat(row.cells[1].innerText);
        let show = true;
        if (!isNaN(minPrice) && price < minPrice) show = false;
        if (!isNaN(maxPrice) && price > maxPrice) show = false;
        row.style.display = show ? '' : 'none';
    }
}
