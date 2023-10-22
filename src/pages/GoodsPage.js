import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "antd";
import Categories from "../components/categories/Categories";
import List from "../components/list/List";

import "./../style/style.scss";

const GoodsPage = ({ list, setList }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState(null);
  const isActive = (value) => (sort === value ? "active" : "");
  const [page, setPage] = useState(1);

  const numShow = 9; //кол-во отображаемых товаров

  const chooseCategory = (category) => {
    setSelectedCategory(category);
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

  return (
    <>
      <section className="catalog">
        <div className="container">
          <Categories
            chooseCategory={chooseCategory}
            selectedCategory={selectedCategory}
            setPage={setPage}
          />
          <List list={sortList} setList={setList} />
          {filterListByCountPage.length > numShow && (
            <Pagination
              simple
              onChange={setPage}
              current={page}
              total={filterListByCountPage.length}
              pageSize={numShow}
              style={{ margin: "0 auto 100px", textAlign: "center" }}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default GoodsPage;
