import "./App.css";

function Category() {
  return (
    <>
      <div className="box-sum">
        <div className="box-all">
          <button ng-click="changePage('prev')">
            <i className="fas fa-angle-left"></i>
          </button>
          <button
            ng-click="changePage(1)"
            ng-className="{ 'active-page': currentPage === 1 }"
            className=""
          >
            1
          </button>
          <button
            ng-click="changePage(2)"
            ng-className="{ 'active-page': currentPage === 2 }"
            className=""
          >
            2
          </button>
          <button
            ng-click="changePage(3)"
            ng-className="{ 'active-page': currentPage === 3 }"
            className="active-page"
          >
            3
          </button>
          <button
            ng-click="changePage(4)"
            ng-className="{ 'active-page': currentPage === 4 }"
            className=""
          >
            4
          </button>
          <button ng-click="changePage('next')">
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Category;
