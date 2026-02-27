/**
 * Registro central de componentes VTEX soportados.
 *
 * Para agregar un nuevo componente:
 *   1. Crear tu archivo de componente en "src/engine/components/".
 *   2. Exportar la definición en "src/engine/components/index.ts".
 *   3. En este archivo, importar el componente y agregarlo a este array.
 */
import type { VtexComponentDefinition } from './types'
import {
  blockReference,
  customContainer,
  flexLayoutCol,
  flexLayoutRow,
  image,
  responsiveLayoutDesktop,
  responsiveLayoutMobile,
  richText,
  stackLayout,
  stickyLayout,
  sliderLayout,
  listContextProductList,
  productSummaryShelf,
  disclosureLayout,
  disclosureTrigger,
  disclosureContent,
  disclosureStateIndicator,
  disclosureLayoutGroup,
  disclosureTriggerGroup,
  icon,
  iconCaret,
  video,
  tabLayout,
  tabList,
  tabListItem,
  tabListItemChildren,
  tabContent,
  tabContentItem,
  modalTrigger,
  modalLayout,
  modalHeader,
  modalContent,
  modalActions,
  modalActionsClose,
  conditionLayoutProduct,
  conditionLayoutBinding,
  conditionLayoutCategory,
  conditionLayoutTelemarketing,
  productBrand,
  productDescription,
  productName,
  productIdentifierProduct,
  productAvailability,
  productImages,
  backToTopButton,
} from './components'

const vtexComponents: VtexComponentDefinition[] = [
  responsiveLayoutDesktop,
  responsiveLayoutMobile,
  flexLayoutRow,
  flexLayoutCol,
  customContainer,
  richText,
  image,
  video,
  icon,
  iconCaret,
  stackLayout,
  stickyLayout,
  blockReference,
  sliderLayout,
  tabLayout,
  modalTrigger,
  listContextProductList,
  productBrand,
  productDescription,
  productName,
  productIdentifierProduct,
  productAvailability,
  productImages,
  productSummaryShelf,
  backToTopButton,
  disclosureLayoutGroup,
  disclosureTriggerGroup,
  disclosureLayout,
  disclosureTrigger,
  disclosureContent,
  disclosureStateIndicator,
  tabList,
  tabListItem,
  tabListItemChildren,
  tabContent,
  tabContentItem,
  modalLayout,
  modalHeader,
  modalContent,
  modalActions,
  modalActionsClose,
  conditionLayoutProduct,
  conditionLayoutBinding,
  conditionLayoutCategory,
  conditionLayoutTelemarketing,
]
export default vtexComponents

/**
 * Obtener definición de componente por tipo.
 */
export function getComponentDefinition(type: string): VtexComponentDefinition | undefined {
  return vtexComponents.find((c) => c.type === type)
}

/**
 * Obtener componentes agrupados por categoría.
 */
export function getComponentsByCategory() {
  const grouped: Record<string, VtexComponentDefinition[]> = {
    layout: [],
    content: [],
    product: [],
    utility: [],
  }
  vtexComponents.filter(c => !c.hidden).forEach((c) => {
    if (!grouped[c.category]) {
      grouped[c.category] = []
    }
    grouped[c.category].push(c)
  })
  return grouped
}
