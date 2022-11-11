export const copyInfosData = () => {
  return {
    pageNum: null,
    pageSize: null,
    totalSize: null,
    totalPages: null,
    content: [copyInfoData()]
  }
}

export const copyInfoData = () => {
  return {
    id: null,
    copyId: null,
    copyName: null,
    typeId: null,
    blockId: null,
    uploadTime: null,
    uploadUid: null,
    hits: null,
    description: null,
    status: null,
    potType: null,
    blockName: null,
    images: [],
    tags: []
  }
}
