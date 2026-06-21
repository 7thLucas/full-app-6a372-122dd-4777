// Import global routes
import routes from "./routes";
import { initializeModels } from "./models";
import waitlistRoutes from "~/features/waitlist/waitlist.routes";
import factionsRoutes from "~/features/factions/factions.routes";

// Initialize models
await initializeModels();

// Register feature routes
routes.use(waitlistRoutes);
routes.use(factionsRoutes);

export default routes;
