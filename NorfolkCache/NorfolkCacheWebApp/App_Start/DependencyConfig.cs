using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using NorfolkCache.Services;
using NorfolkCacheWebApp.Controllers;

namespace NorfolkCacheWebApp
{
    /// <summary>
    /// Represents a configuration for dependencies.
    /// </summary>
    public static class DependencyConfig
    {
        /// <summary>
        /// Registers dependencies configuration.
        /// </summary>
        /// <param name="config">A <see cref="HttpConfiguration "/>.</param>
        public static void Register(HttpConfiguration config)
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // OPTIONAL: Register the Autofac filter provider.
            //builder.RegisterWebApiFilterProvider(config);

            // OPTIONAL: Register the Autofac model binder provider.
            //builder.RegisterWebApiModelBinderProvider();

            builder.RegisterModelBinders(typeof(HomeController).Assembly);

            // Register instances.
            var cache = new CacheService();
            var log = new CacheServiceTraceLog(cache);
            builder.RegisterInstance(log).As<ICacheService>().SingleInstance();

            //builder.RegisterType<CacheService>().As<ICacheService>().SingleInstance();

            // Set the dependency resolver to be Autofac.
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}
