import { hydrateRoot } from 'react-dom/client'
import './styles.css'
import ExamplesPage from './ExamplesPage'

hydrateRoot(document.getElementById('root'), <ExamplesPage />)
