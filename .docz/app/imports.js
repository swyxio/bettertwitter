export const imports = {
  'src/components/FilterField/FilterField.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-filter-field-filter-field" */ 'src/components/FilterField/FilterField.mdx'),
  'src/components/NumberField/NumberField.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-number-field-number-field" */ 'src/components/NumberField/NumberField.mdx'),
  'src/components/OrContainer/OrContainer.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-or-container-or-container" */ 'src/components/OrContainer/OrContainer.mdx'),
  'src/components/TextField/TextField.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-text-field-text-field" */ 'src/components/TextField/TextField.mdx'),
}
