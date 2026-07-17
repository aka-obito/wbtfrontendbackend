import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {

// FRONTEND CODE
const frontendCode = `
<html>
    <head>
        <title>Demo</title>
        <link href="~/lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
        <script src="~/lib/jquery/dist/jquery.min.js"></script>
        <script src="~/lib/bootstrap/dist/js/bootstrap.min.js"></script>
    </head>

    <body class="container">

        <hr />
        <a href="/Home/Create" class="btn btn-primary">Create New Record</a>
        <hr />

        <hr />
        <a href="/Home/Sort" class="btn btn-primary">Sort</a>
        <hr />

        <hr />
        <a href="/Home/Login" class="btn btn-primary">Login</a>
        <hr />

        <hr/>
        <div class="col-md-7">
            <form action="/Home/Search" method="get" class="d-flex">

                <input
                    type="text"
                    name="searchAddress"
                    class="form-control me-2"
                    placeholder="Search by address..."
                    required
                />

                <button type="submit" class="btn btn-success">
                    Search
                </button>

                <a href="/Home/Index" class="btn btn-outline-secondary ms-2">
                    Clear
                </a>

            </form>
        </div>

        <hr />

        <div class="table-responsive">

            <table class="table table-bordered text-center">

                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>

                    @foreach (var item in Model)
                    {
                        <tr>

                            <td>@item.No</td>

                            <td>@item.Name</td>

                            <td>@item.Address</td>

                            <td>
                                <a
                                    class="btn btn-warning"
                                    href="/Home/Edit/@item.No">
                                    Edit
                                </a>
                            </td>

                            <td>
                                <a
                                    class="btn btn-danger"
                                    href="/Home/Delete/@item.No">
                                    Delete
                                </a>
                            </td>

                        </tr>
                    }

                </tbody>

            </table>

        </div>

    </body>

</html>
`;

//backend code
const backendCode = `
using crudpratice.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Numerics;

namespace _Crudops.Controllers
{

    public class HomeController : Controller
    {
        private readonly NewdbContext db = new NewdbContext();

        #region 1. READ (Index)

        public IActionResult Index()
        {
            return View("Index", db.Emps.ToList());
        }

        #endregion

        #region 2. CREATE

        public IActionResult Create()
        {
            return View();
        }

        public IActionResult AfterCreate(Emp emp)
        {
            db.Emps.Add(emp);
            db.SaveChanges();

            return RedirectToAction("Index");
        }

        #endregion

        #region 3. EDIT

        public IActionResult Edit(int? id)
        {
            return View("Edit", db.Emps.Find(id));
        }

        public IActionResult AfterEdit(Emp emp)
        {
            db.Emps.Update(emp);
            db.SaveChanges();

            return RedirectToAction("Index");
        }

        #endregion

        #region 4. DELETE

        public IActionResult Delete(int? id)
        {
            Emp? emp = db.Emps.Find(id);

            db.Emps.Remove(emp);
            db.SaveChanges();

            return RedirectToAction("Index");
        }

        #endregion

        #region 5. SORT

        public IActionResult Sort()
        {
            var emp = db.Emps
                        .OrderBy(x => x.Name)
                        .ToList();

            return View("Index", emp);
        }

        #endregion

        #region 6. SEARCH

        public IActionResult Search(string searchAddress)
        {
            var emp = db.Emps
                        .Where(x =>
                            x.Address != null &&
                            x.Address.Contains(searchAddress))
                        .ToList();

            return View("Index", emp);
        }

        #endregion

        #region 7. LOGIN

        public IActionResult Login()
        {
            return View("Login");
        }

        public IActionResult AfterLogin(string name, int no)
        {
            Emp emp = db.Emps.FirstOrDefault(i =>
                        i.Name == name &&
                        i.No == no);

            if (emp != null)
            {
                return View("Edit", emp);
            }

            ViewBag.msg = "Invalid login";

            return View("Login");
        }

        #endregion
    }
}
`;

  return (
    <>
      <div className="container-fluid mt-4">

        <h1 className="text-center text-primary mb-4">
          React + Node + MySQL CRUD
        </h1>

        <div className="row">

          {/* FRONTEND */}
          <div className="col-md-6">
            <div className="card shadow-lg mb-4">

              <div className="card-header bg-dark text-white">
                <h3>Frontend Code</h3>
              </div>

              <div className="card-body">

                <pre
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "10px",
                    maxHeight: "700px",
                    overflowY: "scroll",
                    overflowX: "scroll",
                    fontSize: "14px"
                  }}
                >
                  <code>{frontendCode}</code>
                </pre>

              </div>
            </div>
          </div>

          {/* BACKEND */}
          <div className="col-md-6">
            <div className="card shadow-lg mb-4">

              <div className="card-header bg-success text-white">
                <h3>Backend Code</h3>
              </div>

              <div className="card-body">

                <pre
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "10px",
                    maxHeight: "700px",
                    overflowY: "scroll",
                    overflowX: "scroll",
                    fontSize: "14px"
                  }}
                >
                  <code>{backendCode}</code>
                </pre>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;