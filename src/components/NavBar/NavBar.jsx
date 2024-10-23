import CardWidget from "../CardWidget/CardWidget"

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand active text-warning bg-dark.text-warning" href="#">BatCaveCrypto</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active text-warning bg-dark.text-warning" aria-current="page" href="#">Inicio</a>
            <a class="nav-link active text-warning bg-dark.text-warning" href="#">B</a>
            <a class="nav-link active text-warning bg-dark.text-warning" href="#">C</a>
          </div>
          <CardWidget />
        </div>
      </div>
    </nav>

  )
}

export default NavBar