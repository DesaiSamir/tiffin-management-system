import { Helmet } from 'react-helmet-async';

import { ItemView } from '../sections/items/view';

// ----------------------------------------------------------------------

export default function ItemPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <ItemView />
    </>
  );
}
