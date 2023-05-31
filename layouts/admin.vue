<template>
  <div>
    <Header />
    <div
      class="container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col max-lg:px-3"
    >
      <AdminSidebar />
      <section class="w-full lg:ml-10" ref="scrollEl">
        <AdminPanel />
        <div class="columns-1">
          <slot> </slot>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>
