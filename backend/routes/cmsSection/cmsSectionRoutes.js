const router = require("express").Router();
const cms = require("../../controllers/cmsSectionController");

router.post("/cms-pages", cms.createPage);
router.get("/cms-pages", cms.getAllPages);
router.get("/cms-pages/:id", cms.getPageById);
router.put("/cms-pages/:id", cms.updatePage);
router.delete("/cms-pages/:id", cms.deletePage);
router.patch("/cms-pages/:id/status", cms.toggleStatus);

router.get("/pages/:slug", cms.getPageBySlug);

module.exports = router;
