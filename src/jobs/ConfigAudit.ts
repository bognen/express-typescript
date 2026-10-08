/**
 * Nightly config audit: logs which app/prefix is being served.
 */

import * as cron from 'node-cron';

import Locals from '../providers/Locals';
import Log from '../middlewares/Log';

class ConfigAudit {
	public static schedule (): void {
		cron.schedule('0 3 * * *', () => {
			const { name, apiPrefix } = Locals.config();

			Log.info(`ConfigAudit :: ${name} is serving /${apiPrefix}`);
		});
	}
}

export default ConfigAudit;
