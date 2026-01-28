const router = require("express").Router();
const cms = require("../../controllers/cmsSectionController");
const { authenticateToken } = require('../../middleware/authMiddleware');

router.post("/cms-pages", authenticateToken ,cms.createPage);
router.get("/cms-pages", cms.getAllPages);
router.get("/cms-pages/:id", cms.getPageById);
router.put("/cms-pages/:id", authenticateToken ,cms.updatePage);
router.delete("/cms-pages/:id", authenticateToken ,cms.deletePage);
router.patch("/cms-pages/:id/status", cms.toggleStatus);

router.get("/pages/:slug", cms.getPageBySlug);

module.exports = router;
