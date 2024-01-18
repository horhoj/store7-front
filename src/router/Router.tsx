import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { ProductListPage } from '~/features/products/pages/ProductListPage';
import { CategoryListPage } from '~/features/categories/pages/CategoryListPage';
import { LoginPage } from '~/features/auth/pages/LoginPage';
import { ProtectedRoute } from '~/features/auth/ProtectedRoute';
import { RegisterPage } from '~/features/auth/pages/RegisterPage';

export function Router() {
  return (
    <>
      <Routes>
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route path={routes.REGISTER} element={<RegisterPage />} />
        <Route
          path={routes.PRODUCT_LIST}
          element={
            <ProtectedRoute>
              <ProductListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.CATEGORY_LIST}
          element={
            <ProtectedRoute>
              <CategoryListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={'*'}
          element={<Navigate to={routes.PRODUCT_LIST} replace={true} />}
        />
      </Routes>
    </>
  );
}
