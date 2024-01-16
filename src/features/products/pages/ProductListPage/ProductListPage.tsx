import styles from './ProductListPage.module.scss';
import { WorkLayout } from '~/features/WorkLayout';

export function ProductListPage() {
  return (
    <WorkLayout>
      <div className={styles.ProductList}>ProductList</div>
    </WorkLayout>
  );
}
