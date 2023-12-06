import React, { useState, useContext } from "react";
import { CustomContext } from "./../Context";
import { Pagination } from "antd";
import Categories from "../components/categories/Categories";
import List from "../components/list/List";
import BreadCramps from "../components/breadCramps/BreadCramps";
import "./../style/style.scss";

const GoodsPage = () => {
  const [sort, setSort] = useState(null);
  const isActive = (value) => (sort === value ? "active" : "");
  const [page, setPage] = useState(1);

  const {
    list,
    setList,
    selectedCategory,
    setSelectedCategory,
    setSelectedCategoryName,
  } = useContext(CustomContext);

  const numShow = 8; //кол-во отображаемых товаров

  const chooseCategory = (category) => {
    setSelectedCategory(category);
  };
  const chooseCategoryName = (categoryName) => {
    setSelectedCategoryName(categoryName);
  };

  const filterListByCountPage = list.filter((item) => {
    if (selectedCategory === "all") {
      return item;
    } else {
      return item.category === selectedCategory;
    }
  });

  const filteredListByCategory = filterListByCountPage.filter((item, id) => {
    return id + 1 <= page * numShow && id >= page * numShow - numShow;
  });

  const sortList = [...filteredListByCategory].sort((a, b) => {
    const A = (a.newPrice && a.price) || a.price;
    const B = (b.newPrice && b.price) || b.price;
    if (sort === "big") {
      return A - B;
    } else if (sort === "less") {
      return B - A;
    }
    return filteredListByCategory;
  });
  console.log(selectedCategory);
  return (
    <>
      <section className="catalog">
        <div className="container">
          <BreadCramps linkOne="/goods" textLink="Товары" />
          {selectedCategory === "all" && (
            <Categories
              chooseCategory={chooseCategory}
              chooseCategoryName={chooseCategoryName}
              selectedCategory={selectedCategory}
              setPage={setPage}
              position="horizontal"
            />
          )}
          {selectedCategory !== "all" && (
            <Categories
              chooseCategory={chooseCategory}
              selectedCategory={selectedCategory}
              setPage={setPage}
              position="vertical"
            />
          )}

          <div className="listWrapper">
            <List list={sortList} setList={setList} />
            {filterListByCountPage.length > numShow && (
              <Pagination
                simple
                onChange={setPage}
                current={page}
                total={filterListByCountPage.length}
                pageSize={numShow}
                style={{ margin: "86px auto 0px", textAlign: "center" }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GoodsPage;
