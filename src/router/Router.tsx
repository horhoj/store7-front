import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { ProductListPage } from '~/features/products/pages/ProductListPage';
import { CategoryListPage } from '~/features/categories/pages/CategoryListPage';

export function Router() {
  return (
    <>
      <Routes>
        <Route path={routes.PRODUCT_LIST} element={<ProductListPage />} />
        <Route path={routes.CATEGORY_LIST} element={<CategoryListPage />} />
        <Route path={'*'} element={<Navigate to={routes.PRODUCT_LIST} />} />
      </Routes>
    </>
  );
}
