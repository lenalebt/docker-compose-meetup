import javax.inject.Inject

import play.api.http.DefaultHttpFilters
import play.filters.gzip.GzipFilter

/**
  * Filter-configuration for play.
  */
class Filters @Inject() (
  gzip: GzipFilter
) extends DefaultHttpFilters(gzip)
