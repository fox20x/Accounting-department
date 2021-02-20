<template>
  <div>
    <div class="page-title">
      <h3>{{'History_Title'|localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      {{'NoRecords'|localize}}.
      <router-link to="/record">{{'AddFirst'|localize}}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items"/>

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import { Doughnut } from 'vue-chartjs'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  extends: Doughnut,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categoires = await this.$store.dispatch('fetchCategories')
    this.setup(categoires)

    this.loading = false
  },
  methods: {
    setup(categoires) {
      this.setupPagination(
        this.records.map(record => {
          
          return {
            ...record,
            categoryName: categoires.find(c => c._id === record.categoryId)
              .title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText:
              record.type === 'income'
                ? localizeFilter('Income')
                : localizeFilter('Outcome')
          }
        })
      )

      this.renderChart({
        labels: categoires.map(c => c.title),
        datasets: [
          {
            label: localizeFilter('CostsForCategories'),
            data: categoires.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c._id && r.type === 'outcome') {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)',
              'rgba(228, 99, 132)',
            ],
            borderColor: [
              'rgba(255, 255, 255)',
              
            ],
            borderWidth: 1
          }
        ]
      })
    }
  },
  components: {
    HistoryTable
  }
}
</script>

