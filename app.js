function addService() {
    const container = document.getElementById("servicesContainer");
    const div = document.createElement("div");
    div.className = "service-row";
    div.innerHTML = `
      <input type="text" placeholder="Descripción" class="desc" oninput="actualizarPreview()" />
      <input type="number" placeholder="Cantidad" class="qty" oninput="actualizarPreview()" />
      <input type="number" placeholder="Precio Unitario" class="price" oninput="actualizarPreview()" />
      <button onclick="eliminarServicio(this); return false;" class="delete-btn">❌</button>
    `;
    container.appendChild(div);
    actualizarPreview();
  }
  
  function eliminarServicio(btn) {
    btn.parentElement.remove();
    actualizarPreview();
  }
  
  function actualizarPreview() {
    const num = document.getElementById("cotNum").value || "(sin número)";
    const cliente = document.getElementById("cliente").value || "(cliente no especificado)";
    const fechaInput = document.getElementById("fecha").value;
    const fechaHoy = fechaInput
      ? new Date(fechaInput).toLocaleDateString('es-MX', {
          year: 'numeric', month: 'long', day: 'numeric'
        })
      : "(sin fecha)";
    
  
    const rows = document.querySelectorAll(".service-row");
    let tableRows = "";
    let total = 0;
  
    rows.forEach(row => {
      const desc = row.querySelector(".desc").value || "-";
      const qty = parseFloat(row.querySelector(".qty").value) || 0;
      const price = parseFloat(row.querySelector(".price").value) || 0;
      const subtotal = qty * price;
      total += subtotal;
  
      tableRows += `
        <tr>
          <td>${desc}</td>
          <td>${qty}</td>
          <td>$${price.toFixed(2)}</td>
          <td>$${subtotal.toFixed(2)}</td>
        </tr>
      `;
    });
  
    document.getElementById("preview").innerHTML = `
      <div class="header">
        <div class="logo-left">
          <img src="logo.jpg" class="logo" alt="Logo Marshall Service" />
        </div>
        <div class="header-center">
          <h2 class="company-name">Marshall Service</h2>
        </div>
        <div class="header-info-right">
          <p>Av La Luz, Loma Bonita, Tepotzotlán<br>
          Estado de México - 54607<br>
          Tel: +52 55 5188 9971<br>
          Email: serviciomarshall@gmail.com</p>
        </div>
      </div>
  
      <hr style="margin: 20px 0;" />
  
      <h2>Cotización No. ${num}</h2>
      <p><strong>Fecha:</strong> ${fechaHoy}</p>
      <p><strong>Cliente:</strong> ${cliente}</p>
  
      <table>
        <thead>
          <tr><th>Servicio</th><th>Cantidad</th><th>Precio</th><th>Subtotal</th></tr>
        </thead>
        <tbody>${tableRows}</tbody>
        <tfoot>
          <tr><td colspan="3"><strong>Total</strong></td><td><strong>$${total.toFixed(2)}</strong></td></tr>
        </tfoot>
      </table>
  
      <p>
        <strong>Condiciones:</strong><br>
        - Vigencia: 7 días naturales<br>
        - Forma de pago: Transferencia o efectivo<br>
        - Lugar: Taller Marshall Service<br>
        - Contacto: serviciomarshall@gmail.com
      </p>
    `;
  }
  
  function downloadPDF() {
    const elemento = document.getElementById("preview");
    const opt = {
      margin: 1,
      filename: `cotizacion-${document.getElementById("cotNum").value || "sin-numero"}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    setTimeout(() => html2pdf().set(opt).from(elemento).save(), 300);
  }
  
  function imprimirCotizacion() {
    const contenido = document.getElementById("preview").innerHTML;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write(`
      <html>
        <head>
          <title>Imprimir Cotización</title>
          <style>
            body { font-family: Arial; margin: 20px; }
            .header { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; justify-content: space-between; }
            .logo { max-width: 100px; }
            .header-center { text-align: center; flex: 1; }
            .header-info-right { text-align: right; flex: 1; font-size: 0.9em; }
            table { width: 100%; border-collapse: collapse; margin-top:20px; }
            th, td { border: 1px solid #ccc; padding:10px; text-align:left; }
            th { background:#eee; }
          </style>
        </head>
        <body onload="window.print(); setTimeout(() => window.close(), 100)">
          ${contenido}
        </body>
      </html>`);
    win.document.close();
  }
  
  window.onload = () => addService();
  