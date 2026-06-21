// Import global routes
import routes from "./routes";
import { initializeModels } from "./models";
import waitlistRoutes from "~/features/waitlist/waitlist.routes";

// Initialize models
await initializeModels();

// Register feature routes
routes.use(waitlistRoutes);

export default routes;
